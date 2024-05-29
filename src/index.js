



// Callbacks
const handleClick = (ramenId) => {
  fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching data')
      } return res.json()
    })
    .then(info => {
      //const ramenId = info.id
      const name = document.querySelector('.name')
      name.textContent = info.name
      const restaurant = document.querySelector('.restaurant')
      restaurant.textContent = info.restaurant
      const pic = document.querySelector('.detail-image')
      pic.src = info.image
      const rating = document.querySelector('#rating-display')
      rating.textContent = info.rating
      const comment = document.querySelector('#comment-display')
      comment.textContent = info.comment

    })
    .catch(e => {
      console.error(e)
    })
};




const displayRamens = () => {

  fetch('http://localhost:3000/ramens')
    .then(res => {
      if (!res.ok) {
        throw new Error('Error fetching data!')
      } return res.json()
    }).then(data => {
      //console.log(data)

      const div = document.querySelector('#ramen-menu')
      data.forEach(ramen => {
        const image = document.createElement('img')
        image.src = ramen.image
        div.appendChild(image)
        //const ramenId = ramen.id

        //         //////
        image.addEventListener('click', () => handleClick(ramen.id))

        //         //////




        //second requirement
        image.addEventListener('click', () => {
          const ramenId = ramen.id
          fetch(`http://localhost:3000/ramens/${ramenId}`)
            .then(res => {
              if (!res.ok) {
                throw new Error('Error fetching info!')
              } return res.json()
            })
            .then(info => {

              const name = document.querySelector('.name')
              name.textContent = info.name
              const restaurant = document.querySelector('.restaurant')
              restaurant.textContent = info.restaurant
              const pic = document.querySelector('.detail-image')
              pic.src = info.image



            })



        })



        //         //end of second req
      })

    })
    .catch(e => {
      console.error(e)
    })
}




const addSubmitListener = () => {
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#new-name')
    const restaurant = document.querySelector('#new-restaurant')
    const image = document.querySelector('#new-image')
    const rating = document.querySelector('#new-rating')
    const comment = document.querySelector('#new-comment')

    const newObj = {
      "name": name.value,
      "restaurant": restaurant.value,
      "image": image.value,
      "rating": rating.value,
      "comment": comment.value

    }

    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newObj)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error fetching info!')
        } return res.json()
      }).then(data => {
        console.log(data)

        const div = document.querySelector('#ramen-menu')
        const newImg = document.createElement('img')
        newImg.classList.add('new-detail-image')

        newImg.src = data.image
        div.appendChild(newImg)

        newImg.addEventListener('click', () => {
          const picDiv = document.querySelector('#ramen-detail')
          picDiv.appendChild(newImg)
        })
      })
      .catch(e => {
        console.error(e)
      })
    form.reset()
  })


}










// //displayRamens()

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    displayRamens()
    addSubmitListener()
  })
}

main()

//Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
