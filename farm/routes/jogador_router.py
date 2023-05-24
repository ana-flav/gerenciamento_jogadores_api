from fastapi import APIRouter

from config.database import conexao
from models.jogador import Jogador
from schemas.jogador import jogadorEntidade, jogadoresListagem
from bson import ObjectId


jogador_router = APIRouter()

@jogador_router.get('/')
async def inicio():
    return{"Hey, what´s up!"}

@jogador_router.get('/jogadores')
async def listar_jogadores():
    return jogadoresListagem(conexao.local.jogador.find())

@jogador_router.get('/jogadores/{jogador_id}')
def busca_jogador_id(jogador_id):
    return jogadorEntidade(
        conexao.local.jogador.find_one
        (
            {"_id": ObjectId(jogador_id)}
        )
    )

@jogador_router.post('/jogadores')
async def cadastrar_jogadores(jogador: Jogador):
    conexao.local.jogador.insert_one(dict(jogador))
    return jogadoresListagem(conexao.local.jogador.find())

@jogador_router.put('/jogadores/{jogador_id}')
async def atualizar_jogador(jogador_id, jogador: Jogador):
    jogadorEntidade(
        conexao.local.jogador.find_one_and_update(
            {"_id": ObjectId(jogador_id)},
            {"$set": dict(jogador)},
    )
    )
    return jogadoresListagem(conexao.local.jogador.find())
@jogador_router.delete('/jogadores/{jogador_id}')
async def deletar_jogador(jogador_id):
    conexao.local.jogador.find_one_and_delete(
        {"_id": ObjectId(jogador_id)},
    )
    return jogadoresListagem(conexao.local.jogador.find())