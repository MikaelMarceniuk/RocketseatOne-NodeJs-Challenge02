## Requisitos

**Usuario**

- [ X ] Criar usuario, com as seguintes informações:
  - Nome
- [ X ] Deve ser possivel identificar o usuario entre as requisicoes
- [ ] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

**Refeicao**

- [ ] Deve ser possível registrar uma refeição feita, com as seguintes informações:
      _As refeições devem ser relacionadas a um usuário._
  - Nome
  - Descrição
  - Data e Hora
  - Está dentro ou não da dieta
- [ ] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [ ] Deve ser possível apagar uma refeição
- [ ] Deve ser possível listar todas as refeições de um usuário
- [ ] Deve ser possível visualizar uma única refeição
- [ ] Deve ser possível recuperar as métricas de um usuário
  - Quantidade total de refeições registradas
  - Quantidade total de refeições dentro da dieta
  - Quantidade total de refeições fora da dieta
  - Melhor sequência de refeições dentro da dieta
- O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

## Tecnologias

| Nome                                           |
| ---------------------------------------------- |
| [Fastify](https://fastify.dev/)                |
| [Typescript](https://www.typescriptlang.org/)  |
| [SQLite](https://www.npmjs.com/package/sqlite) |
| [Knex.js](https://knexjs.org/)                 |
| [Vitest](https://vitest.dev/)                  |
| [Zod](https://zod.dev/)                        |
