import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const contadorModule = {
    namespaced: true,
    state: {
        contador: 0
    },
    getters: {
        contadorAtual: state => state.contador
    }
}

const tarefasModule = {
    namespaced: true,
    state: {
        tarefas: []
    },
    getters: {
        tarefasConcluidas: (state, getters, rootState, rootGetters) => {
            console.log('Getters: state: ', state, rootState)
            return state.tarefas.filter(t => t.concluido)
        },
        tarefasAFazer: state => state.tarefas.filter(t => !t.concluido),
        totalDeTarefasConcluidas: (state, getters) => getters.tarefasConcluidas.length,
        buscarTarefaPorId: state => id => state.tarefas.find(t => t.id === id),
        boasVindas: (state, getters, rootState, rootGetters) => {
            // state.tarefas // tarefas.tarefas
            // getters.tarefasAFazer // 'tarefas/tarefasAFazer'
            console.log('State Global: ', rootState.usuario)
            console.log('Getter Global: ', rootGetters.mensagemBoasVindas)
            return rootGetters.mensagemBoasVindas
        }
    },
    mutations: {
        listarTarefas: (state, { tarefas }) => {
            state.tarefas = tarefas
        }
    },
    actions: {
        buscarTarefas: (context, payload) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([
                        { id: 1, titulo: 'Aprender Vue', concluido: true },
                        { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                        { id: 3, titulo: 'Aprender Vuex', concluido: false }
                    ])
                }, 2000)
            })
        },
        listarTarefas: async ({ commit, dispatch, state, rootState, getters, rootGetters }, payload) => {
            console.log('Action: listarTarefas')
            const tarefas = await dispatch('buscarTarefas')
            console.log('Mutation: listarTarefas')
            commit('listarTarefas', { tarefas }) // tarefas/listarTarefas
            console.log('Actions: state: ', state, rootState)

            // commit('logar', 'Plínio Naves') // tarefas/logar (não funciona)
            // commit('logar', 'Plínio Naves', { root: true }) // logar
            // dispatch('logar', 'Plínio Naves') // tarefas/logar (não funciona)
            dispatch('logar', 'Plínio Naves', { root: true }) // logar
            // dispatch('logar', null, { root: true }) // caso não tiver payload
        }
    }
}

const store = new Vuex.Store({
    state: {
        usuario: 'Plínio'
    },
    getters: {
        mensagemBoasVindas: state => `Olá ${state.usuario}`
    },
    actions: {
        logar: ({ commit }, usuario) => {
            commit('logar', usuario)
        }
    },
    mutations: {
        logar: (state, usuario) => {
            state.usuario = usuario
        }
    },
    modules: {
        contador: contadorModule,
        tarefas: tarefasModule
    }
})

console.log('Store: ', store)

export default store