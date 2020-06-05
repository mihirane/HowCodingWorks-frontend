class BlogPostLayout {
  static createParagraph (data) {
    return `<p>${data.text}</p>`
    // const paragraph = document.createElement('p')
    // paragraph.innerHTML = data.text
    // return paragraph
  }

  static createImageElement (data) {
    return `
      <div style='text-align: center; margin: 32px 0px;'>
        <img src='${data.file.url}' style='width: 100%; margin: auto;'>
        <span style='font-size: 16px; color: grey; font-weight: 300;'>${data.caption}</span>
      </div>
    `
    // const div = document.createElement('div')
    // div.style = 'text-align: center; margin: 32px 0px;'

    // const image = document.createElement('img')
    // image.src = data.file.url
    // image.style = 'width: 100%; margin: auto;'

    // const caption = document.createElement('span')
    // caption.innerHTML = data.caption
    // caption.style = 'font-size: 16px; color: grey; font-weight: 300;'
    // div.appendChild(image)
    // div.appendChild(caption)

    // return div
  }

  static createList (data) {
    let listItems = ''

    data.items.forEach((item) => {
      listItems += `<li>${item}</li>\n`
    })

    if (data.style === 'unordered') {
      return `<ul>${listItems}</ul>`
    } else {
      return `<ol>${listItems}</ol>`
    }

    // let list
    // if (data.style === 'unordered') {
    //   list = document.createElement('ul')
    // } else {
    //   list = document.createElement('ol')
    // }

    // data.items.forEach((item) => {
    //   const listElement = document.createElement('li')
    //   listElement.innerHTML = item
    //   list.appendChild(listElement)
    // })

    // return list
  }

  static createCodeContainer (data) {
    return `
      <div style='margin: 32px 16px; padding: 16px; background-color: #212121; color: #ffffff; border-radius: 4px; font-size: 18px; font-family: 'Source Code Pro', monospace; overflow: scroll;'>
        ${data.code.replace(/(?:\r\n|\r|\n)/g, '<br>')}
      </div>
    `

    // const div = document.createElement('div')
    // div.innerHTML = data.code.replace(/(?:\r\n|\r|\n)/g, '<br>')
    // div.style = "margin: 32px 16px; padding: 16px; background-color: #212121; color: #ffffff; border-radius: 4px; font-size: 18px; font-family: 'Source Code Pro', monospace; overflow: scroll;"
    // return div
  }
}

function createBlogPost (blocks) {
  let postDescriptionContainer = ''

  if (blocks) {
    blocks.forEach((item) => {
      if (item.type === 'paragraph') {
        postDescriptionContainer += BlogPostLayout.createParagraph(item.data)
      } else if (item.type === 'image') {
        postDescriptionContainer += BlogPostLayout.createImageElement(item.data)
      } else if (item.type === 'list') {
        postDescriptionContainer += BlogPostLayout.createList(item.data)
      } else if (item.type === 'code') {
        postDescriptionContainer += BlogPostLayout.createCodeContainer(item.data)
      }
    })
  }

  return postDescriptionContainer

  // const postDescriptionContainer = document.createElement('div')

  // if (blocks) {
  //   blocks.forEach((item) => {
  //     if (item.type === 'paragraph') {
  //       postDescriptionContainer.appendChild(BlogPostLayout.createParagraph(item.data))
  //     } else if (item.type === 'image') {
  //       postDescriptionContainer.appendChild(BlogPostLayout.createImageElement(item.data))
  //     } else if (item.type === 'list') {
  //       postDescriptionContainer.appendChild(BlogPostLayout.createList(item.data))
  //     } else if (item.type === 'code') {
  //       postDescriptionContainer.appendChild(BlogPostLayout.createCodeContainer(item.data))
  //     }
  //   })
  // }

  // return postDescriptionContainer
}

module.exports = createBlogPost
