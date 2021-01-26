// index.js for file upload
let reader = new FileReader()

function select() {
    reader.readAsArrayBuffer($("#file")[0].files[0])
    $("#upload").attr("disabled", false)
}

function upload() {
    fetch("/api/default/upload")
    .then(r => r.text())
    .then(url => fetch(url, {
            method: "put",
            body: reader.result
        })).then(r => {
            if (r.ok) { location.reload() 
        }).catch(ex => {
            console.log(ex)
            alert("Upload error")
        })
}

$(document).ready(function () {
    $("#file").change(select)
    $("#upload").click(upload)
})
