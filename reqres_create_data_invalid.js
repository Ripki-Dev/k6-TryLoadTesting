import {check} from 'k6';
import http from 'k6/http';

const url = 'https://reqres.in/api/users';

export default function () {
    let dataInvalid = { name: 12, job: 0 };
    let params = { headers: { 'Content-Type': 'application/json' } };
    let resInvalid = http.post(url, JSON.stringify(dataInvalid), params);
    
    check(resInvalid, {
        'response status is 200': (r) => r.status === 201,
        'name is 12': (r) => r.json().name === 12,
        'job is 0': (r) => r.json().job === 0,
    })

}