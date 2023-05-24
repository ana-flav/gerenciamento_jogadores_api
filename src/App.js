import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import JogadorList from './components/JogadorList';

function App() {
  const [jogadorList, setJogadorList] = useState([{}]);
  const [jogadorNome, setJogadorNome] = useState('');
  const [jogadorIdade, setJogadorIdade] = useState('');
  const [jogadorTime, setJogadorTime] = useState('');
  const [jogadorId, setJogadorId] = useState('');
  const [textoBotao, setTextoBotao] = useState("Cadastrar");
  useEffect(()=>{
    axios.get('http://127.0.0.1:8000/jogadores')
      .then(resposta => {
        console.log(resposta.data)
        setJogadorList(resposta.data)
      }).catch(
        (error) => {console.log(error)}
      )
  });

  const atualizaJogador = (jogador) => {
    axios.put(`http://127.0.0.1:8000/jogadores/${jogadorId}`, jogador)
    .then(resposta => {
            alert("Jogador foi atualizado com sucesso!")
        }
    )
    .catch((error) => {
        console.log(error)
    })
  }
  
  const adicionaJogador = (jogador) => {
    axios.post('http://127.0.0.1:8000/jogadores', jogador)
      .then(resposta => {
        alert(jogadorNome + ' adicionado com sucesso');
      })
      .catch((error) => {
        console.log(error)
      })
  }
  
  const adicionaAtualizaJogador = () =>{
    const jogador = {
      'nome': jogadorNome,
      'idade': jogadorIdade,
      'time': jogadorTime
    }
    if(jogadorId  === ''){
      adicionaJogador(jogador)
    } else {
      atualizaJogador(jogador)
    }
  }
  
  return (
    <div className='container'>
      <div className='mt-3 justify-content-center align-items-center mx-auto'
      style={{'width': '70vh', 'backgroundColor':'#ffffff'}}
      >
         <h2 className='text-center text-white bg-success card mb-1 pb-1'>Gerenciamento de Jogadores</h2>
         <h5 className='card text-center text-white bg-success mb-1 pb-1'>Informações de Jogador</h5>
         <div className='mt-3 card-body text-center'>
         <h7 className='card text-center text-black bg-light'>Cadastro do Jogador</h7>
          <form>
            <div class="form-group">
                  
                  <label htmlfor="formGroupExampleInput"></label>
                  <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nome" onChange = {event => setJogadorNome(event.target.value)} value={jogadorNome}>
                  </input>

            </div>
            <div class="form-group">
                  
                  <label htmlfor="formGroupExampleInput2"></label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Idade" onChange = {event => setJogadorIdade(event.target.value)} value={jogadorIdade}>
                  </input>

            </div>
            <div class="form-group">
                  
                  <label htmlfor="formGroupExampleInput3"></label>
                  <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Time" onChange = {event => setJogadorTime(event.target.value)} value={jogadorTime}>
                  </input>
                  
            </div>
              <div class="form-group mt-3 mb-3">

              <button type="submit" className="btn btn-success bg-white text-success" onClick = {adicionaAtualizaJogador}>{textoBotao}</button>
             
            </div>
         </form>
         <h7 className='card text-center text-black bg-light'>Lista de jogadores</h7>
          <div className='mt-3 card-body text-center'>
          <JogadorList 
          jogadorList={jogadorList}
          setJogadorId={setJogadorId}
          setJogadorNome={setJogadorNome}
          setJogadorIdade={setJogadorIdade}
          setJogadorTime={setJogadorTime}
          setTextoBotao={setTextoBotao}
          /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
