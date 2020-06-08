<template>
  <div class="ma-0 pa-0">
    <div class="mb-6 px-2">
      <v-list-item class="pl-1">
        <v-list-item-avatar size="14%" left>
          <v-img
            :src="apolloData.getTopicFromTopicName.thumbnailLink"
            :alt="getTopicName + 'Thumbnail'"
          />
        </v-list-item-avatar>
        <span class="mr-4">
          <v-list-item-title class="font-weight-bold mb-1 topic-name">
            <h1 class="font-weight-bold headline">{{ getTopicName }}</h1>
          </v-list-item-title>
          <v-list-item-subtitle class="font-weight-light followers-count">
            <span id="follow-count">{{ apolloData.getTopicFromTopicName.followersCount }}</span>
            <span
              id="follow-count-increment"
              style="display: none;"
            >{{ apolloData.getTopicFromTopicName.followersCount + 1 }}</span>
            <span
              id="follow-count-decrement"
              style="display: none;"
            >{{ apolloData.getTopicFromTopicName.followersCount - 1 }}</span>
            <span>Following</span>
          </v-list-item-subtitle>
        </span>
        <v-list-item-action class="d-flex justify-center">
          <v-btn id="follow-btn" small outlined @click="followTopic()">
            Follow
          </v-btn>
          <v-btn
            id="unfollow-btn"
            small
            color="primary"
            class="elevation-0"
            @click="unfollowTopic()"
          >
            Following
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <h3
        class="font-weight-regular topic-description"
        style="font-size: 18px;"
      >
        {{ apolloData.getTopicFromTopicName.description }}
      </h3>
    </div>
    <v-divider />
    <div class="posts-grid-container">
      <div v-for="post in apolloData.getTopicFromTopicName.posts" :key="post.id" class="ma-0 pa-0">
        <post-card
          :post-topic-name="apolloData.getTopicFromTopicName.name"
          :post-id="post.id"
          :post-title="post.title"
          :post-caption="post.caption"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostCard from '~/components/PostCard'

export default {
  name: 'TopicContainer',
  layout: 'default',
  watchQuery: true,
  components: {
    PostCard
  },
  async asyncData ({ app, params, store, error }) {
    try {
      if (store.state.currentUser != null) {
        const apolloData = await app.$topicContainerViewModel.getTopicContainerData(
          store.state.currentUser.uid,
          params.topicName
        )

        if (
          apolloData &&
          apolloData.data &&
          !apolloData.errors &&
          apolloData.data.getTopicFromTopicName != null
        ) {
          return { apolloData: apolloData.data }
        } else {
          error({ statusCode: 404, message: 'Topic not found' })
        }
      } else {
        const apolloData = await app.$topicContainerViewModel.getTopicContainerDataWithoutUser(
          params.topicName
        )

        if (apolloData && apolloData.data) {
          return { apolloData: apolloData.data }
        } else {
          throw new Error('Some error occurred in apolloData')
        }
      }
    } catch (errorObj) {
      // eslint-disable-next-line
      console.log(errorObj)
      error({ statusCode: 404, message: '404 Not Found' })
    }
  },
  computed: {
    getTopicName () {
      return this.apolloData.getTopicFromTopicName.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ')
    }
  },
  async mounted () {
    const followed = await this.apolloData.checkIfTopicIsFollowedByUser
    const followBtn = document.getElementById('follow-btn')
    const unfollowBtn = document.getElementById('unfollow-btn')

    if (!followed) {
      followBtn.style = 'display: initial;'
    } else {
      unfollowBtn.style = 'display: initial;'
    }
  },
  methods: {
    async followTopic () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$topicContainerViewModel.followTopic(
            this.$cookies.get('currentUser').uid,
            this.$route.params.topicName
          )

          if (!response.data) {
            throw new Error('Some error occurred while following topic')
          }

          const followBtn = document.getElementById('follow-btn')
          const unfollowBtn = document.getElementById('unfollow-btn')

          followBtn.style = 'display: none;'
          unfollowBtn.style = 'display: initial;'

          const followCount = document.getElementById('follow-count')
          const followCountIncrement = document.getElementById(
            'follow-count-increment'
          )
          const followCountDecrement = document.getElementById(
            'follow-count-decrement'
          )

          if (!this.apolloData.checkIfTopicIsFollowedByUser) {
            followCount.style = 'display: none;'
            followCountIncrement.style = 'display: initial;'
            followCountDecrement.style = 'display: none;'
          } else {
            followCount.style = 'display: initial;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: none;'
          }
        } else {
          return this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    async unfollowTopic () {
      try {
        if (
          this.$cookies.get('currentUser') &&
          this.$cookies.get('currentUser').uid != null
        ) {
          const response = await this.$topicContainerViewModel.unfollowTopic(
            this.$cookies.get('currentUser').uid,
            this.$route.params.topicName
          )

          if (!response.data) {
            throw new Error('Some error occurred while unfollowing topic')
          }

          const followBtn = document.getElementById('follow-btn')
          const unfollowBtn = document.getElementById('unfollow-btn')

          followBtn.style = 'display: initial;'
          unfollowBtn.style = 'display: none;'

          const followCount = document.getElementById('follow-count')
          const followCountIncrement = document.getElementById(
            'follow-count-increment'
          )
          const followCountDecrement = document.getElementById(
            'follow-count-decrement'
          )

          if (this.apolloData.checkIfTopicIsFollowedByUser) {
            followCount.style = 'display: none;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: initial;'
          } else {
            followCount.style = 'display: initial;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: none;'
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
      title: this.apolloData.getTopicFromTopicName.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' '),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.apolloData.getTopicFromTopicName.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#follow-btn,
#unfollow-btn {
  display: none;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .topic-name {
    font-size: 20px;
  }

  .followers-count {
    font-size: 12px;
  }

  .topic-description {
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .posts-grid-container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 16px;
    padding-top: 16px;
    justify-items: stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .topic-name {
    font-size: 24px;
  }

  .followers-count {
    font-size: 12px;
  }

  .topic-description {
    font-size: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .posts-grid-container {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
    gap: 16px;
    padding-top: 16px;
    justify-items: stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .topic-name {
    font-size: 34px;
  }

  .followers-count {
    font-size: 16px;
  }

  .topic-description {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .posts-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 16px;
    padding-top: 16px;
    justify-items: stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .topic-name {
    font-size: 34px;
  }

  .followers-count {
    font-size: 16px;
  }

  .topic-description {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .posts-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 16px;
    padding-top: 16px;
    justify-items: stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .topic-name {
    font-size: 34px;
  }

  .followers-count {
    font-size: 16px;
  }

  .topic-description {
    font-size: 20px;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .posts-grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 16px;
    padding-top: 16px;
    justify-items: stretch;
    align-items: stretch;
    justify-content: stretch;
    align-content: stretch;
  }
}
</style>
