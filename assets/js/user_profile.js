function imagePreview(event){
    const image = URL.createObjectURL(event.target.files[0]);
    const previewSpan = document.getElementById('preview');
    const newImage = document.createElement('img');
    previewSpan.innerText = '';
    newImage.src = image;
    newImage.width = "100";
    previewSpan.appendChild(newImage);
}