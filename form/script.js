
const getInformation = async (event) => {
    data = {
        userName : event.target.name.value,
        userTitle : event.target.title.value,

        userDescription : event.target.description.value,

        userCompanyName : event.target.companyName.value,
        userCompanyXP: event.target.companyExperience.value,

        userSkills : event.target.skills.value,

        userSchool: event.target.schools.value,
        userSchoolSpec: event.target.schoolSpecialization.value
    }
    console.log(data);
    
  const zip = new JSZip();
  zip.file("index.html", generateHTML(data));
  zip.file("style.css", GenerateCSS(data));

  const zipBlob = await zip.generateAsync({ type: "blob" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(zipBlob);
  a.download = "portfolio.zip";
  a.click();
}


const generateHTML = (data) => {
    return `
            <!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>${data.userName}</title>
</head>
<body><section class="portfolio">
    <h1 class="title">${data.userTitle} ${data.userName}</h1>

    <div class="description section">
        <h2>Key Summary</h2>
        <p>${data.userDescription}</p>
    </div>

    <div class="workExperience section">
        <h2>Work Experience</h2>
        <h3>${data.userCompanyName}</h3>
        <p>${data.userCompanyXP}</p>
    </div>

    <div class="keySkills section">
        <h2>Skills:</h2>
        <ul>
              ${data.userSkills.split(',').map(project => `<li>${project.trim()}</li>`).join('')}
        </ul>
    </div>

    <div class="education section">
        <h2>Education:</h2>
        <h3>${data.userSchool}</h3>
        <p>${data.userSchoolSpec}</p>
    </div></section>
</body>
</html>
    `;
}
const GenerateCSS = () => {
    return  `
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #141414;
}

.portfolio {
    width: 750px;
    height: 90vh;
    background-color: #f3f3f3;
    padding: 30px;
}

.title {
    text-align: center;
    font-size:  2.75rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #000000;
    border-bottom: 2px solid #e7ae5c;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.section {
    border-bottom: 2px solid #eaeaea;
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-family: Arial, Helvetica, sans-serif;
}

h2 {
    color: #e7ae5c;
    padding-bottom: 10px;
    font-size: 1.75rem;
}

.workExperience h3 {
    font-size: 1rem;
}

.keySkills ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5%;
    padding: 0% 10%;
}
.keySkills ul li{
    list-style: disc ;
}`
}

document.querySelector("#portfolioForm").addEventListener("submit", (event)=> {
event.preventDefault()
getInformation(event)})

document.querySelector(".reset").addEventListener("click", (event) => {
    const data = document.querySelector("#portfolioForm")
    data.name.value = ""
    data.title.value = ""
    data.description.value = ""
    data.companyName.value = ""
    data.companyExperience.value = ""
    data.skills.value = ""
    data.schools.value = ""
    data.schoolSpecialization.value = ""
})


