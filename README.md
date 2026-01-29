# Viceri Desafio

## Sobre o Projeto

Este projeto foi desenvolvido com foco em boas práticas de arquitetura e escalabilidade, adotando padrões de mercado tanto no back-end quanto no front-end.

### Back-end
Utilizou-se **Clean Architecture** para a estruturação do servidor.
- **Escalabilidade e Boas Práticas**: Mesmo para um escopo reduzido (CRUD), escolhi esta arquitetura para garantir que o sistema esteja preparado para crescer de forma organizada.
- **Serviços e Injeção de Dependência**: O código foi separado em serviços com responsabilidades definidas, fazendo uso extensivo de injeção de dependência para promover desacoplamento e testabilidade.

### Front-end
A aplicação cliente segue uma **Arquitetura baseada em Features**.
- **Organização Modular**: Fiz a estrutura desta forma pensando em facilitar a manutenção e a adição de novas funcionalidades, isolando cada feature do sistema.
- **Reutilização de Componentes**: 
  - Mesmo componente **form-heroi** utilizado para o Update, Criação e Consulta
  - Componentes genéricos feitos para servirem para todo o sistema, podendo ser reutilizados em usos diversos (**toast**, **popup-confirmation**)
- **Gerenciamento de Estado com Signals**: O controle de estado global é realizado através de Signals.
  - **Benefícios dos utilizacao de Signals**:
    - **Reatividade Fina**: Otimiza a performance ao atualizar apenas os componentes que dependem diretamente do estado alterado.
    - **Código Mais Limpo**: Reduz a complexidade e o código boilerplate, tornando o controle de estado mais intuitivo e legível.
- **Uso de Promises para Confirmação**:
  - **Fluxo Linear**: A escolha de utilizar **Promise** para o retorno do **popup-confirmation** simplifica o código dos componentes. Permite aguardar a resposta do usuário diretamente (**await**), eliminando a necessidade de gerenciar **Outputs** ou observáveis para janelas de diálogo globais.

### Scripts
Scripts se encontram em: \Viceri.Desafio\viceri.desafio.server\Database
