const gitForm = document.querySelector('#github-form')
const list = document.querySelector('#user-list')
const repoList = document.querySelector('#repos-list')
gitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(resp => resp.json())
    .then (something => {
      list.innerHTML = ''
      repoList.innerHTML = ''
      something.items.map(value => {
        let h2 = document.createElement('h2')
        h2.innerText = value.login
        h2.addEventListener('click', e => repos(value.login, e))
        let h3 = document.createElement('h3')
        let a = document.createElement('a')
        a.href = value.html_url
        a.innerText = 'Profile'
        a.target = '_blank'
        let img = document.createElement('img')
        img.src = value.avatar_url
        let li = document.createElement('li')
        h3.appendChild(a)
        li .append(h2, h3,img)
        list.append(li)
      })
    })
    gitForm.reset()
  })

  function repos(username, e){
    repoList.innerHTML = ''
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(r => {
      r.map(repo => {
        let li2 = document.createElement('li')
        let h3 = document.createElement('h3')
        let a = document.createElement('a')
        a.innerText = repo.name
        a.href = repo.html_url
        a.target = '_blank'
        h3.appendChild(a)
        li2.append(h3)
        repoList.append(li2)
      })
    })
  }