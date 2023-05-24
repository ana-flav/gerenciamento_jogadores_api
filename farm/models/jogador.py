from pydantic import BaseModel

class Jogador(BaseModel):
    idade: int
    nome: str
    time: str