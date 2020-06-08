<template>
  <div class="ma-0 pa-0">
    <div class="mb-4">
      <h1 class="font-weight-bold blog-title-font">
        {{ apolloData.getPostFromId.title }}
      </h1>
      <div class="subtitle-1 font-weight-regular pt-3">
        {{ getDate }}
      </div>
    </div>
    <topic-card
      class="pl-0 mb-10"
      :topic-name="apolloData.getTopicFromTopicName.name"
      :topic-thumbnail-link="apolloData.getTopicFromTopicName.thumbnailLink"
      :topic-followers-count="apolloData.getTopicFromTopicName.followersCount"
      :has-user-followed-topic="checkIfTopicIsFollowedByUser()"
    />
    <!-- eslint-disable-next-line -->
    <div style="font-size: 20px;" class="font-weight-regular" v-html="getPostDescription" />
    <!-- BlogPost Action Panel -->
    <v-card
      class="blog-post-bottom-action-bar d-flex flex-row justify-space-around align-center pa-4"
    >
      <!-- Like Button -->
      <div class="ma-0 pa-0 d-flex flex-row justify-space-between align-center">
        <v-btn id="like-btn" color="info" icon dark @click="likePost()">
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn id="dislike-btn" color="accent" icon @click="dislikePost()">
          <v-icon>favorite</v-icon>
        </v-btn>
        <span id="like-count" class="ml-2 body-1">{{ apolloData.getLikesCountOnPost }}</span>
        <span id="like-count-increment" class="ml-2 body-1">{{ apolloData.getLikesCountOnPost + 1 }}</span>
        <span id="like-count-decrement" class="ml-2 body-1">{{ apolloData.getLikesCountOnPost - 1 }}</span>
      </div>

      <!-- Save Button -->
      <div class="ma-0 pa-0 d-flex flex-row justify-space-between align-center">
        <v-btn id="save-btn" color="info" icon @click="savePost()">
          <v-icon>bookmark</v-icon>
        </v-btn>
        <v-btn id="unsave-btn" color="primary" icon @click="unsavePost()">
          <v-icon>bookmark</v-icon>
        </v-btn>
        <span id="saved-count" class="ml-2 body-1">{{ apolloData.getSavedCountOnPost }}</span>
        <span
          id="saved-count-increment"
          class="ml-2 body-1"
        >{{ apolloData.getSavedCountOnPost + 1 }}</span>
        <span
          id="saved-count-decrement"
          class="ml-2 body-1"
        >{{ apolloData.getSavedCountOnPost - 1 }}</span>
      </div>

      <!-- Share Button -->
      <v-btn icon color="#CDCDCD" @click="copyLinkToClipboard()">
        <v-icon>share</v-icon>
      </v-btn>
    </v-card>
    <v-snackbar v-model="snackbar">
      Link Copied To Clipboard!
      <v-btn color="primary" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import copy from 'copy-to-clipboard'
import TopicCard from '~/components/TopicCard'

export default {
  name: 'BlogPost',
  layout: 'default',
  watchQuery: true,
  components: {
    TopicCard
  },
  async asyncData ({ app, params, store, error }) {
    try {
      const topicName = params.topicName
      const postId = params.postId.split('--')[1]

      if (store.state.currentUser != null) {
        const apolloData = await app.$blogPostViewModel.getBlogPostData(
          store.state.currentUser.uid,
          topicName,
          postId
        )

        if (apolloData && apolloData.data && !apolloData.errors) {
          return { apolloData: apolloData.data }
        } else {
          error({ statusCode: 404, message: 'Post not found' })
        }
      } else {
        const apolloData = await app.$blogPostViewModel.getBlogPostDataWithoutUser(
          topicName,
          postId
        )

        if (apolloData && apolloData.data && !apolloData.errors) {
          return { apolloData: apolloData.data }
        } else {
          error({ statusCode: 404, message: 'Post not found' })
        }
      }
    } catch (errorObj) {
      // eslint-disable-next-line
      console.log(errorObj)
      error({ statusCode: 404, message: '404 Not Found' })
    }
  },
  data () {
    return {
      snackbar: false
    }
  },
  computed: {
    getDate () {
      const dateObj = new Date(
        parseInt(this.apolloData.getPostFromId.creationTime)
      )
      const month = dateObj.toLocaleString('default', { month: 'long' })
      const date = dateObj.getDate()
      const year = dateObj.getFullYear()
      return `${month} ${date}, ${year}`
    },
    getTopicName () {
      return this.apolloData.getTopicFromTopicName.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ')
    },
    getPostDescription () {
      return this.$createBlogPost(
        JSON.parse(this.apolloData.getPostFromId.description).blocks
      )
    }
  },
  mounted () {
    const likeBtn = document.getElementById('like-btn')
    const dislikeBtn = document.getElementById('dislike-btn')
    const saveBtn = document.getElementById('save-btn')
    const unsaveBtn = document.getElementById('unsave-btn')

    if (!this.apolloData.checkIfPostIsLikedByUser) {
      likeBtn.style = 'display: initial;'
    } else {
      dislikeBtn.style = 'display: initial;'
    }

    if (!this.apolloData.checkIfPostIsSavedByUser) {
      saveBtn.style = 'display: initial;'
    } else {
      unsaveBtn.style = 'display: initial;'
    }
  },
  methods: {
    copyLinkToClipboard () {
      copy(this.$env.baseUrl + this.$route.fullPath)
      this.snackbar = true
    },
    checkIfTopicIsFollowedByUser () {
      if (this.apolloData.checkIfTopicIsFollowedByUser) {
        return this.apolloData.checkIfTopicIsFollowedByUser
      } else {
        return false
      }
    },
    async likePost () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$blogPostViewModel.likePost(
            this.$cookies.get('currentUser').uid,
            this.$route.params.postId.split('--')[1]
          )

          if (!response.data) {
            throw new Error('Some error occurred while liking post')
          }

          const likeBtn = document.getElementById('like-btn')
          const dislikeBtn = document.getElementById('dislike-btn')

          likeBtn.style = 'display: none;'
          dislikeBtn.style = 'display: initial;'

          const likeCount = document.getElementById('like-count')
          const likeCountIncrement = document.getElementById(
            'like-count-increment'
          )
          const likeCountDecrement = document.getElementById(
            'like-count-decrement'
          )

          if (!this.apolloData.checkIfPostIsLikedByUser) {
            likeCount.style = 'display: none;'
            likeCountIncrement.style = 'display: initial;'
            likeCountDecrement.style = 'display: none;'
          } else {
            likeCount.style = 'display: initial;'
            likeCountIncrement.style = 'display: none;'
            likeCountDecrement.style = 'display: none;'
          }
        } else {
          return this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    async dislikePost () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$blogPostViewModel.dislikePost(
            this.$cookies.get('currentUser').uid,
            this.$route.params.postId.split('--')[1]
          )

          if (!response.data) {
            throw new Error('Some error occurred while disliking post')
          }

          const likeBtn = document.getElementById('like-btn')
          const dislikeBtn = document.getElementById('dislike-btn')

          likeBtn.style = 'display: initial;'
          dislikeBtn.style = 'display: none;'

          const likeCount = document.getElementById('like-count')
          const likeCountIncrement = document.getElementById(
            'like-count-increment'
          )
          const likeCountDecrement = document.getElementById(
            'like-count-decrement'
          )

          if (this.apolloData.checkIfPostIsLikedByUser) {
            likeCount.style = 'display: none;'
            likeCountIncrement.style = 'display: none;'
            likeCountDecrement.style = 'display: initial;'
          } else {
            likeCount.style = 'display: initial;'
            likeCountIncrement.style = 'display: none;'
            likeCountDecrement.style = 'display: none;'
          }
        } else {
          return this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    async savePost () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$blogPostViewModel.savePost(
            this.$cookies.get('currentUser').uid,
            this.$route.params.postId.split('--')[1]
          )

          if (!response.data) {
            throw new Error('Some error occurred while saving post')
          }

          const saveBtn = document.getElementById('save-btn')
          const unsaveBtn = document.getElementById('unsave-btn')

          saveBtn.style = 'display: none;'
          unsaveBtn.style = 'display: initial;'

          const savedCount = document.getElementById('saved-count')
          const savedCountIncrement = document.getElementById(
            'saved-count-increment'
          )
          const savedCountDecrement = document.getElementById(
            'saved-count-decrement'
          )

          if (!this.apolloData.checkIfPostIsSavedByUser) {
            savedCount.style = 'display: none;'
            savedCountIncrement.style = 'display: initial;'
            savedCountDecrement.style = 'display: none;'
          } else {
            savedCount.style = 'display: initial;'
            savedCountIncrement.style = 'display: none;'
            savedCountDecrement.style = 'display: none;'
          }
        } else {
          return this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    async unsavePost () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$blogPostViewModel.unsavePost(
            this.$cookies.get('currentUser').uid,
            this.$route.params.postId.split('--')[1]
          )

          if (!response.data) {
            throw new Error('Some error occurred while unsaving post')
          }

          const saveBtn = document.getElementById('save-btn')
          const unsaveBtn = document.getElementById('unsave-btn')

          saveBtn.style = 'display: initial;'
          unsaveBtn.style = 'display: none;'

          const savedCount = document.getElementById('saved-count')
          const savedCountIncrement = document.getElementById(
            'saved-count-increment'
          )
          const savedCountDecrement = document.getElementById(
            'saved-count-decrement'
          )

          if (this.apolloData.checkIfPostIsSavedByUser) {
            savedCount.style = 'display: none;'
            savedCountIncrement.style = 'display: none;'
            savedCountDecrement.style = 'display: initial;'
          } else {
            savedCount.style = 'display: initial;'
            savedCountIncrement.style = 'display: none;'
            savedCountDecrement.style = 'display: none;'
          }
        } else {
          return this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  },
  head () {
    return {
      title: this.apolloData.getPostFromId.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.apolloData.getPostFromId.caption
        },
        {
          property: 'og:title',
          content: this.apolloData.getPostFromId.title
        },
        {
          property: 'og:description',
          content: this.apolloData.getPostFromId.caption
        },
        {
          property: 'og:site_name',
          content: this.$env.baseUrl
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#like-btn,
#dislike-btn,
#save-btn,
#unsave-btn {
  display: none;
}

#like-count-increment,
#saved-count-increment,
#like-count-decrement,
#saved-count-decrement {
  display: none;
}

.blog-post-bottom-action-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .blog-title-font {
    font-size: 34px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .blog-title-font {
    font-size: 34px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .blog-title-font {
    font-size: 48px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .blog-title-font {
    font-size: 48px;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .blog-title-font {
    font-size: 48px;
  }
}
</style>
