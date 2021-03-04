import axios from "axios"

export const getRewards = async () =>
    await axios.get(`${process.env.REACT_APP_API}/rewards`);

export const removeReward = async (rewardId, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/reward/${rewardId}`, {
        headers: {
            authtoken,
        },
    });

export const createReward = async (reward, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/reward`,
        { reward },
        {
            headers: {
                authtoken,
            },
        });