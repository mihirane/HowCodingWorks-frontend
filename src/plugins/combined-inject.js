import BlogPostViewModel from '~/viewmodel/BlogPostViewModel'
import CreateTopicViewModel from '~/viewmodel/CreateTopicViewModel'
import PostEditorViewModel from '~/viewmodel/PostEditorViewModel'
import TopicContainerViewModel from '~/viewmodel/TopicContainerViewModel'
import UserProfileViewModel from '~/viewmodel/UserProfileViewModel'

import uploadImageToFirebase from '~/image-uploader/image-uploader.js'
import createBlogPost from '~/blog-post-layout/BlogPostLayout'
import env from '~/environment/env'

export default ({ app }, inject) => {
  inject('blogPostViewModel', BlogPostViewModel)
  inject('createTopicViewModel', CreateTopicViewModel)
  inject('postEditorViewModel', PostEditorViewModel)
  inject('topicContainerViewModel', TopicContainerViewModel)
  inject('userProfileViewModel', UserProfileViewModel)
  inject('createBlogPost', createBlogPost)
  inject('uploadImageToFirebase', uploadImageToFirebase)
  inject('env', env)
}
