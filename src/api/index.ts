import {Passage} from "@/types/passage";
import {DataStatus, Status} from "@/types/dataStatus";

const baseUrl = 'https://api.esv.org/v3/passage/html/?q=';

export async function downloadPassage(passageName: string): Promise<DataStatus<Passage>> {
    try {
        const url = baseUrl + encodeURIComponent(passageName);

        const response = await fetch(url, {
            method: 'GET',
            headers: {'Authorization': process.env.EXPO_PUBLIC_API_KEY ?? ''}
        });

        if (response.ok) {
            const data = await response.json();
            return {data, status: Status.success};
        } else {
            const text = await response.text();
            return {status: Status.error, error: text};
        }
    } catch (error) {
        return {status: Status.error, error: error?.toString()};
    }
}