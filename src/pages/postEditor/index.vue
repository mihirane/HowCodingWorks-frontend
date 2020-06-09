<template>
  <div class="ma-0 pa-0">
    <textarea
      id="post-title-input"
      v-model="postTitle"
      placeholder="Post Title"
      class="display-2 mb-1"
      rows="1"
    />
    <client-only>
      <div id="editorjs" />
    </client-only>
    <v-btn
      fab
      color="primary"
      large
      class="publish-btn elevation-4"
      @click="openUploadDialog = true"
    >
      <v-icon color="white">
        publish
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="openUploadDialog"
      :width="200"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar>
          <v-btn icon dark @click="openUploadDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="font-weight-bold">
            Publish Post
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn text dark :disabled="!valid" color="primary" @click="createPost()">
              Publish
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="px-6 pb-2 pt-6">
          <v-form ref="publishPostForm" v-model="valid">
            <v-select
              v-model="postTopicName"
              :items="getAllTopics"
              label="Select a topic"
              hint="Select a suitable topic for your post."
              :rules="postTopicRules"
              required
            />
            <v-textarea
              v-model="postCaption"
              label="Enter a caption for your post..."
              hint="This caption will be displayed along with title on other pages."
              :counter="100"
              rows="10"
              :rules="postCaptionRules"
              required
            />
          </v-form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ClientOnly from 'vue-client-only'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'PostEditor',
  middleware: 'admin',
  layout: 'default',
  components: {
    ClientOnly
  },
  async asyncData ({ app, error }) {
    try {
      const getAllTopics = await app.$postEditorViewModel.getAllTopics()

      if (getAllTopics && getAllTopics !== null) {
        await getAllTopics.forEach(async (topic, index) => {
          getAllTopics[index] = await {
            text: topic.name.match(/[A-Z][a-z]+|[0-9]+/g).join(' '),
            value: topic.name
          }
        })

        return { getAllTopics }
      } else {
        throw new Error('Some error occurred while fetching all topics')
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(err)
      error({ statusCode: 404, message: 'Topic not found' })
    }
  },
  data () {
    return {
      editor: null,
      // post related data
      postTitle: '',
      postTopicName: '',
      postCaption: '',
      postDescription: null,
      published: false,
      openUploadDialog: false,
      allTopics: [],
      // form related data
      valid: false,
      postCaptionRules: [
        (v) => {
          if (v === '') {
            return 'Post caption is required.'
          } else if (new RegExp('^[A-Z][A-Za-z]*').test(v) === false) {
            return 'Post caption must start with a captial letter.'
          } else {
            return true
          }
        }
      ],
      postTopicRules: [
        (v) => {
          if (v === '') {
            return 'A suitable topic for post is required.'
          } else {
            return true
          }
        }
      ]
    }
  },
  mounted () {
    this.editor = this.createEditorInstance()
    const autosize = require('autosize')
    autosize(document.getElementById('post-title-input'))
  },
  methods: {
    async createPost () {
      try {
        const postDescription = JSON.stringify(await this.editor.save())
        const createPost = await this.$postEditorViewModel.createPost(
          {
            topicName: this.postTopicName,
            title: this.postTitle,
            caption: this.postCaption,
            description: postDescription
          }
        )

        if (createPost && createPost !== null) {
          return this.$router.push('/')
        } else {
          throw new Error('Some error occurred while creating post')
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err)
      }
    },
    createEditorInstance () {
      const componentObj = this

      if (process.client) {
        const EditorJS = require('@editorjs/editorjs')
        // Editor.js Plugins
        const ImageTool = require('@editorjs/image')
        const List = require('@editorjs/list')
        const Code = require('@editorjs/code')
        const InlineCode = require('@editorjs/inline-code')
        const Embed = require('@editorjs/embed')
        const Marker = require('@editorjs/marker')
        const Header = require('@editorjs/header')

        return new EditorJS({
          holder: 'editorjs',
          autofocus: false,
          placeholder: "Don't hold back, speak your heart out...",
          tools: {
            inlineCode: InlineCode,
            embed: Embed,
            marker: Marker,
            header: {
              class: Header,
              config: {
                levels: [2],
                defaultLevel: 2
              }
            },
            image: {
              class: ImageTool,
              inlineToolbar: false,
              config: {
                uploader: {
                  async uploadByFile (file) {
                    try {
                      await componentObj.$uploadImageToFirebase(
                        file,
                        '/posts/' + uuidv4()
                      )
                    } catch (error) {
                      // eslint-disable-next-line
                      console.log(error)
                    }
                  }
                }
              }
            },
            list: List,
            code: Code
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-btn {
  position: fixed;
  z-index: 10;
  bottom: 20px;
  right: 20px;
}

#post-title-input {
  border: none;
  border-color: transparent;
  outline: 0 !important;
  font-weight: 600;
  overflow: hidden;
  resize: none;
  width: 100%;
}

@media only screen and (min-width: 1050px) {
  #editorjs {
    margin-left: -17%;
  }
}
</style>
