import { BASE_URL } from "../globals/constants"

export const getAllBreeds = async () => {
    const res = await fetch(`${BASE_URL}breeds/list/all`)
    const data = await res.json()
    return data.message;
}

export const getBreedImage = async (breed: string) => {
    const res = await fetch(`${BASE_URL}breed/${breed}/images/random`)
    const data = await res.json()
    return data.message;
}