import axios from '../core/utils/axios';

export class WakeupService {

    public static wakeup = async () => {
        axios.get(`/wakeup`);
    }

}
