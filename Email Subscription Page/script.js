  const message = document.querySelector(".message");
  const submitBtn = document.getElementById("submit-button");
  const inputBtn = document.getElementById("email-input");
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxxjgVbhrjUA0HNjYGFwyYdV3wt5LGQjeLn_sdTdZs9zppaEd7BKC-tGzTyuWLoUAgYOg/exec'
  const form = document.forms['submit-to-google-sheet']

 
submitBtn.addEventListener('click',()=>{
        message.hidden = false;
        setTimeout(()=>{
            message.hidden = true;
        },5000);
    })

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then((response) => {
        console.log('Success!', response);
        inputBtn.value="";
    })
      .catch(error => console.error('Error!', error.message))
  })

 
  