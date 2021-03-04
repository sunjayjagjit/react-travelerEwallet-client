

export const rewardReducer = (
    state = false,
    action

) => {

    switch (action.type) {
        case "REWARD_APPLIED":
            return action.payload;
        default:
            return state;
    }
};