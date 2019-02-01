import {
    LISTAR_TAREFAS
} from './mutation-types'

export default {
    [LISTAR_TAREFAS]: (state, { tarefas }) => {
        state.tarefas = tarefas
    }
}