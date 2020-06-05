<template>
  <div class="ma-0 pa-0">
    <v-form ref="createTopicForm" v-model="valid">
      <v-text-field
        v-model="topicName"
        label="Topic Name"
        :counter="20"
        :rules="topicNameRules"
        required
      />
      <v-textarea
        v-model="topicDescription"
        placeholder="Topic Description"
        rows="6"
        hint="Describe the topic in brief."
        :rules="topicDescriptionRules"
        required
      />
      <client-only>
        <v-file-input
          v-model="topicThumbnail"
          class="mb-2"
          accept="image/*"
          placeholder="Topic Thumbnail"
          hint="This will be displayed as the topic logo."
          :rules="topicThumbnailRules"
          :counter="1"
          :show-size="1000"
          required
        />
      </client-only>
      <div class="ma-0 pa-0 d-flex flex-row justify-end align-center">
        <v-btn class="mt-8 mr-2" text @click="clearAllFields()">
          Clear
        </v-btn>
        <v-btn class="mt-8" color="primary" :disabled="!valid" @click="createTopic()">
          Create
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import ClientOnly from 'vue-client-only'
import createTopicViewModel from '~/viewmodel/CreateTopicViewModel'
import uploadImageToFirebase from '~/plugins/image-uploader'

export default {
  name: 'CreateTopic',
  middleware: 'admin',
  layout: 'default',
  components: {
    ClientOnly
  },
  data () {
    return {
      valid: false,
      topicName: '',
      topicDescription: '',
      topicThumbnail: null,
      topicNameRules: [
        (v) => {
          if (v === '') {
            return 'Topic Name is required.'
          } else if (v.length >= 20) {
            return 'Topic Name must be less than 20 characters.'
          } else {
            return true
          }
        }
      ],
      topicDescriptionRules: [
        (v) => {
          if (v === '') {
            return 'Topic Description is required.'
          } else if (new RegExp('^[A-Z][A-Za-z]*').test(v) === false) {
            return 'Topic Description must start with a captial letter.'
          } else {
            return true
          }
        }
      ],
      topicThumbnailRules: [
        (v) => {
          if (!v) {
            return 'Topic Thumbnail is required.'
          } else if (v.size >= 1000000) {
            return 'Topic Thumbail must be smaller than 1 MB in size'
          } else {
            return true
          }
        }
      ]
    }
  },
  methods: {
    async createTopic () {
      try {
        const topicName = this.topicName
          .split(' ')
          .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
          .join('')

        const result = await uploadImageToFirebase(
          this.topicThumbnail,
          '/topics/' + topicName
        )

        if (result.success === 1) {
          const topicThumbnail = await result.file.url

          const apolloData = await createTopicViewModel.createTopic(
            topicName,
            this.topicDescription,
            topicThumbnail
          )
          // eslint-disable-next-line
        console.log(apolloData)
          if (apolloData && apolloData.data && !apolloData.errors) {
            return this.$router.push('/')
          } else {
            throw new Error('Some error occurred while creating topic')
          }
        } else {
          throw new Error('Some error occurred while uploading topic thumbnail image to firebase')
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
    clearAllFields () {
      this.topicName = ''
      this.topicDescription = ''
      this.topicThumbnail = null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
