export const zipUpload = async (event1) => {
  const req = await fetch("/getAllCompressed");
  const res = await req.json();
  console.log(res);
  if (res.message == "zip ready") {
    event1.target.classList.add("d-none");
    const btnUploadAll = document.querySelector(".btn-uploadAll");
    btnUploadAll.classList.remove("invisible");
    btnUploadAll.addEventListener("click",(event2)=> {
        event2.preventDefault()
        location.href = "/images.zip"
        event2.target.classList.add("invisible")
        event1.target.classList.remove("d-none");
    })
  } else {
    console.log("internal server err");
  }
};
