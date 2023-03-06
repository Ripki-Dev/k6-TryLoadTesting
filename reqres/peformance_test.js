/*
+----+--------+---------------------------------------------------------------------------------------------------------------+
| No | Module | Test Scenario Description                                                                                     |
+----+--------+---------------------------------------------------------------------------------------------------------------+
| 7  |        | Do performance testing {VU: 1000, Iteration: 3500, response tolerance: 2s}                                    |
+----+--------+---------------------------------------------------------------------------------------------------------------+
*/
import {check, group} from 'k6';
import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";



const BASE_URL = 'https://reqres.in/api/users/';
const params = { headers: { 'Content-Type': 'application/json' } };

export const options = {
    vus: 1000,
    iterations : 3500,
    // scenarios: {
    //     contacts: {
    //         executor: 'ramping-arrival-rate',
    //         timeUnit: '1s',
    //         preAllocatedVUs: 1000,
    //         maxVUs: 1000,

    //         stages: [
    //             { target: 350, duration: '10s' },
    //             { target: 0, duration: '10s' },
    //         ],
    //     },
    // },
    thresholds: {
        http_req_duration: ['p(95)<2000'], 
        http_req_failed: ['rate<0.01'], 
        checks: ['rate>0.99'],
    },
};


export default function () {
    group('Scenario-1-Post', () => {
        let data = {name: 'riprip', job: 'QA Engineer'};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;


        check(res, {
            'response status is 200': (r) => r.status === 201,
            'response body contains name': (r) => r.json().name === 'riprip',
            'reesponse body contains job': (r) => r.json().job === 'QA Engineer',
            'response body contains createdAt': (r) => r.json().createdAt === day

        });
    });

    group('Scenario-2-Put', () => {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/2";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;

        
        check(response, {
            'response status is 200': (r) => r.status === 200,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains updatedAt': (r) => r.json().updatedAt === day

        })
    });
}

export function handleSummary(data) {
    return {
      "baru.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}