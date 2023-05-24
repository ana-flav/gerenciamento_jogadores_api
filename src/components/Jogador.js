import React from "react";
import axios from "axios";

function Jogador(props){
    const excluiJogador = (jogadorId) => {
        axios.delete(`http://127.0.0.1:8000/jogadores/${jogadorId}`)
            .then(
                resposta => {
                    alert("Jogador removido com sucesso " + resposta.data)
                }
            )
    }
 

      
    const editaJogador = (jogador) => {
        props.setJogadorId(jogador.id);
        props.setJogadorNome(jogador.nome);
        props.setJogadorIdade(jogador.idade);
        props.setJogadorTime(jogador.time);
        props.setTextoBotao('Atualizar');

    }
    return (
        <div>
            <p>
                <span className="fw-bold">
                    {props.jogador.nome} - {props.jogador.idade} - {props.jogador.time}
                </span>
                <button
                    onClick={()=> editaJogador(props.jogador)}
                    className="botao btn btn-outline-info btn-sm" style={{ marginLeft: '10px' }}>
                    <span>Editar</span>
                </button>
                <button
                    onClick={()=> excluiJogador(props.jogador.id)}
                    className="botao btn btn-outline-danger btn-sm" style={{ marginLeft: '10px' }}
                >
                    <span className="text-lowercase">X</span>
                </button>
            </p>
        </div>
    )
}

export default Jogador;