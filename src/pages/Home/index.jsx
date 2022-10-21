//importação de Hooks
import React, { useState, useEffect } from 'react';
//arquivos que não sejam .jsx é necessário colocar a extensão. Ex: .css, .html.
import './style.css';
// {} é usado quando se passa o export default do componente direto na função que renderiza esse componente.
import { Card } from '../../components/Card';

export function Home() {
  //o no vetor de um estado tem 2 elementos. Primeiro você passa o conteúdo que você quer armazenar no estado e depois a função que vai armazenar esse conteúdo e deve começar com set e depois o nome da função
  const [studentName, setStudentName] = useState();
  const [students , setStudents] = useState([]);
  const [user, setUser] = useState({name:'', avatar: ''});

  function handleAddStudent() {
    //objeto que armazena o valor do conteúdo do estado(studentName) e o tempo atual com o newDate passando a formatação da hora
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    //a função setStudents atualiza o estado e o prevState mantém o estado anterior sem modificá-lo. (...) serve para que o estado antigo seja despejado no vetor principal evitando um [['primeiroEstado'], 'segundoEstado']. Ficando no final, de forma correta ['primeiroEstado', 'segundoEstado']
    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    //corpo do useEffect. Onde vai ter ações para executar. É executado automaticamente assim que a interface é renderizada.
    //fetch é usado para consumir uma api. Nesse caso, externa.
    //é possível usar o async com useEffect, porém, apenas criando uma função no corpo e chamando ela após. Não é possível usar diretamente na chamada do useEffect
    fetch('https://api.github.com/users/fcb-dev')
    .then(response => response.json())
    .then(data => {
      //os dados da api foram convertidos em json e armazenados no estado setUser.
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
    //se o colchete estiver vazio, o useEffect só será chamado uma vez, ao renderizar a interface. Porém, se existir, por exemplo, um ou mais estados dentro, será executado sempre que esse estado ou estados, mudarem.
  }, []);

  return (
    <div className="container-fluid">
      <header>
        <h1>Lista de Presença</h1>
        <div className="name-img">
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input type="text" placeholder="Digite um nome" onChange={r => setStudentName(r.target.value)}/>
      <div className="btn">
        <button type="button" onClick={handleAddStudent}>Adicionar</button>
      </div>
      {
        //.map vai percorrer o vetor e salvar dentro de uma variável(student) o valor de cara índice. Key precisa ser único. Geralmente é id ou uuid
        students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)
      }
      
    </div>
  )
}