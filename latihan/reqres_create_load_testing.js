import http from "k6/http";
import {check, group, sleep, fail} from "k6";

export const options = {
    stages: [
        { duration: '5m', target: 100 }, 
        { duration: '10m', target: 100 }, 
        { duration: '5m', target: 0 }, 
      ],
      thresholds: {
        'http_req_duration': ['p(99)<2000'],
      },
};

const url = 'https://reqres.in/api/users';

export default function () {
    const num1 = 8;
    const num2 = 10;
    const randomNameGenerator = num => {
       let res = '';
       for(let i = 0; i < num; i++){
          const random = Math.floor(Math.random() * 27);
          res += String.fromCharCode(97 + random);
       };
       return res;
    };
    let names = randomNameGenerator(num1);
    let jobs = randomNameGenerator(num2);

    let data = { name: names, job: jobs };
    let res = http.post(url, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    
    // console.log(res.body);
    check(res, {
        'response status is 200': (r) => r.status === 201,
        'name is ${names}': (r) => r.json().name === names,
        'job is ${jobs}': (r) => r.json().job === jobs,
    })
    sleep(1);
}
