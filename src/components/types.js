export default class Types {
    static routing = [
        { id: 0, key: "players", value: "/players" },
        { id: 1, key: "teams", value: "/teams" },
    ];

    static routingMap = Types.routing.reduce((acc, item) => acc.set(item.key, { ...item }), new Map());

    static optionsItemsPerPage = [
        {value: 2, label: "2"},
        {value: 4, label: "4"},
        {value: 6, label: "6"},
        {value: 8, label: "8"},
    ];

    static localStorage = {
        token: "TOKEN",
        name: "NAME",
        avatarUrl: "AVATAR_URL",
    };
}
