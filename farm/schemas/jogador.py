def jogadorEntidade(db_item) -> dict:
    return {
        "id": str(db_item['_id']),
        "idade": db_item['idade'],
        "nome": db_item['nome'],
        "time": db_item['time']
    }

def jogadoresListagem(db_item_list) ->list:
    lista_jogadores = []
    for item in db_item_list:
        lista_jogadores.append(jogadorEntidade(item))
    return lista_jogadores  