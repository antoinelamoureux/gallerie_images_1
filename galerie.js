// galerie.js

ajaxReq()

function ajaxReq() {
    let xhr = new XMLHttpRequest()

    xhr.open('GET', 'galerie_images.xml')
    xhr.send()

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = xhr.responseXML
            processResponse(data);
        }
    }
}

function processResponse(data) {
    const title = document.createElement('h1')
    title.textContent = 'Galerie d\'images'
    document.body.appendChild(title)

    const imagesContainer = document.createElement('div')
    imagesContainer.classList.add('container')
    document.body.appendChild(imagesContainer)

    const elements = data.documentElement.childNodes

    let images = []
    elements.forEach(element => {
        if (element.nodeName === 'image') {  
        images.push(element)
        }
    })

    console.log(images)

    images.forEach(image => {
        //const newImage = document.createElement('img')
        const newImage = new Image(200, 100);
        const smallImage = `./galeries/${image.getAttribute('categorie')}/${image.children[0].textContent}`
        const bigImage = `./galeries/${image.getAttribute('categorie')}/big/${image.children[0].textContent}`
        const imageDesc = image.children[1].textContent
        newImage.setAttribute('src', smallImage)
        newImage.addEventListener('click', e => launchModal(bigImage, imageDesc))
        imagesContainer.appendChild(newImage)
    })

}

function launchModal(bigImage, imageDesc) {
    //window.location.replace(imageSource);
    const modal = document.querySelector('.modal')
    const modalContent = document.createElement('div')
    modalContent.classList.add('modal-content')
    modal.appendChild(modalContent)

    const closeButton = document.createElement('span')
    closeButton.classList.add('close-button')
    closeButton.textContent = 'X';
    modalContent.appendChild(closeButton)

    const image = document.createElement('img')
    image.src = bigImage
    image.style.height = '350px'
    image.style.weight = '500px'
    modalContent.appendChild(image)

    const decription = document.createElement('p')
    decription.textContent = imageDesc
    decription.style.textAlign = 'center'
    modalContent.appendChild(decription)

    modal.classList.toggle('show-modal')
    closeButton.addEventListener('click', () => {
        modal.classList.toggle('show-modal')
        window.location.replace('./')
    })
}


