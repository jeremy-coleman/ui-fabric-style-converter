export const GetGroupCount = (groups) => {
    let total = 0;
    if (groups) {
        const remainingGroups = [...groups];
        let currentGroup;
        while (remainingGroups && remainingGroups.length > 0) {
            ++total;
            currentGroup = remainingGroups.pop();
            if (currentGroup && currentGroup.children) {
                remainingGroups.push(...currentGroup.children);
            }
        }
    }
    return total;
};
