<template>
  <v-list-item>
    <v-list-item-avatar size="52px" left @click="navigateToTopic()">
      <v-img :src="$props.topicThumbnailLink" :alt="getTopicName + 'Thumbnail'" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title class="mb-0 pb-0 title" style="cursor: pointer;" @click="navigateToTopic()">
        {{ getTopicName }}
      </v-list-item-title>
      <v-list-item-subtitle class="font-weight-light subtitle-1">
        <span id="follow-count">{{ $props.topicFollowersCount }}</span>
        <span
          id="follow-count-increment"
          style="display: none;"
        >{{ $props.topicFollowersCount + 1 }}</span>
        <span
          id="follow-count-decrement"
          style="display: none;"
        >{{ $props.topicFollowersCount - 1 }}</span>
        <span>Following</span>
      </v-list-item-subtitle>
    </v-list-item-content>
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
</template>

<script>
export default {
  name: 'TopicCard',
  props: {
    topicName: {
      type: String,
      default: null
    },
    topicThumbnailLink: {
      type: String,
      default: null
    },
    topicFollowersCount: {
      type: Number,
      default: 0
    },
    hasUserFollowedTopic: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getTopicName () {
      return this.$props.topicName.match(/[A-Z][a-z]+|[0-9]+/g).join(' ')
    }
  },
  mounted () {
    const followBtn = document.getElementById('follow-btn')
    const unfollowBtn = document.getElementById('unfollow-btn')

    if (!this.$props.hasUserFollowedTopic) {
      followBtn.style = 'display: initial;'
      unfollowBtn.style = 'display: none;'
    } else {
      followBtn.style = 'display: none;'
      unfollowBtn.style = 'display: initial;'
    }
  },
  methods: {
    navigateToTopic () {
      return this.$router.push('/' + this.$props.topicName)
    },
    async followTopic () {
      try {
        if (
          this.$store.state.currentUser.uid &&
          this.$store.state.currentUser.uid != null
        ) {
          const response = await this.$topicContainerViewModel.followTopic(
            this.$store.state.currentUser.uid,
            this.$props.topicName
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

          if (!this.$props.hasUserFollowedTopic) {
            followCount.style = 'display: none;'
            followCountIncrement.style = 'display: initial;'
            followCountDecrement.style = 'display: none;'
          } else {
            followCount.style = 'display: initial;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: none;'
          }
        } else {
          this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    async unfollowTopic () {
      try {
        if (
          this.$store.state.currentUser.uid &&
          this.$store.state.currentUser.uid != null
        ) {
          const response = await this.$topicContainerViewModel.unfollowTopic(
            this.$store.state.currentUser.uid,
            this.$props.topicName
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

          if (this.$props.hasUserFollowedTopic) {
            followCount.style = 'display: none;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: initial;'
          } else {
            followCount.style = 'display: initial;'
            followCountIncrement.style = 'display: none;'
            followCountDecrement.style = 'display: none;'
          }
        } else {
          this.$router.push('/signUp')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#follow-btn,
#unfollow-btn {
  display: none;
}
</style>
