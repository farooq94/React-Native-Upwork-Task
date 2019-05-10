export default (article) => {
    return {
        id: article.id,
        title: article.title.rendered,
        image: article.type_img,
        date: article.date,
        content: article.content.rendered
    }
     
}