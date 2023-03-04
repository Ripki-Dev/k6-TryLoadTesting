import {check} from 'k6';
import http from 'k6/http';

const url = 'https://reqres.in/api/users';

export default function () {
    let datavalid = { name: 12, job: 0 };
    let params = { headers: { 'Content-Type': 'application/json' } };
    let resvalid = http.post(url, JSON.stringify(datavalid), params);
    
    check(resvalid, {
        'response status is 200': (r) => r.status === 201,
        'name is 12': (r) => r.json().name === 12,
        'job is 0': (r) => r.json().job === 0,
    })
}