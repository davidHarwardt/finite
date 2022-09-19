type State = {
    name: string,
    uuid: string,
    idx: number,
};

class FiniteAutomaton {
    public readonly name: string;
    private states: State[];
    private connections: (string[])[][];
    private finalStates: State[];
    private initialState: State;

    constructor(name: string) {
        this.name = name;
        this.states = [];
        this.connections = [];
        this.finalStates = [];
        this.initialState = this.addState("q0");
    }

    public addState(name?: string, isFinal?: boolean): State {
        this.states.push(<State> {
            name: name ?? `q${this.states.length}`,
            uuid: crypto.randomUUID(),
            idx: this.states.length,
        });

        this.connections.forEach(v => v.push([]));
        this.connections.push(new Array(this.states.length).fill(undefined));

        let state = this.states.at(-1)!;
        if(isFinal) this.finalStates.push(state);

        return state;
    }

    public connect(a: State, b: State, label: string) {
        this.connections[a.idx][b.idx].push(label);
    }

    private getNext(current: State, word: string): [State, number] | undefined {
        let nextIdx = this.connections[current.idx].findIndex(v => !!v.find(v => word.startsWith(v)));
        let next = this.states[nextIdx];

        if(next)    { return [next, 1] }
        else        { return undefined }
    }

    public test(str: string): boolean {
        let current = str;
        while(current.length < 0) {

        }
    }
}