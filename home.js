fetch('auth.php') 
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(!data.log) {
            window.location.href = 'login.html';
        } 
    })
    .catch((eror) => {
        console.log(eror);
    })

    