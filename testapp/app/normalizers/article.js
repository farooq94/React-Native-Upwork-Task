export default (articles) => {
    return articles.map((article)=>{
        return {
            id: article.id,
            title: article.title.rendered,
            image: article.type_img,
        }
    }) 
}