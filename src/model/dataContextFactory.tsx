import React, { createContext, Dispatch, FC, Reducer, useMemo, useReducer } from "react";


interface ActionBuilderConstructor<Action, T extends ActionBuilder<Action>> {
    new (dispatch: Dispatch<Action>): T;
}

interface ActionBuilder<Action> {
    dispatch: Dispatch<Action>;
}

interface ContextState<State, Action, T extends ActionBuilder<Action>> {
    state: State;
    action: T;
}


export const dataContextFactory = <State, Action, T extends ActionBuilder<Action>> (
    reducer: Reducer<State, Action>,
    ActionBuilderClazz: ActionBuilderConstructor<Action, T>,
    INITIAL_STATE: State
): [ React.Context<ContextState<State, Action, T>>, FC ] => {
    // @ts-ignore
    const Context = createContext<ContextState>();

    const Provider: FC = (props) => {
        const [ state, dispatch ] = useReducer(reducer, INITIAL_STATE);
        const action: T = useMemo(() => new ActionBuilderClazz(dispatch), [ dispatch ]);

        return (
            <Context.Provider value={{ state, action }}>
                { props }
            </Context.Provider>
        )
    }

    return [ Context, Provider ];
}
