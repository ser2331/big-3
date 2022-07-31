export default class Types {
    static routing = [
        { id: 0, key: "players", value: "/players" },
        { id: 1, key: "teams", value: "/teams" },
    ];

    static routingMap = Types.routing.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());
}
