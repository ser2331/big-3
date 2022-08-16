
export const builderParamsIds = (teamIds?: (string | number | null)[]) => {
    if (teamIds?.length) {
        return teamIds.map((id: string | number | null) => [`teamIds=${id}`]).join("&");
    } else return "";
};