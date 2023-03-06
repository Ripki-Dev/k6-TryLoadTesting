/*
+----+--------+---------------------------------------------------------------------------------------------------------------+
| No | Module | Test Scenario Description                                                                                     |
+----+--------+---------------------------------------------------------------------------------------------------------------+
| 1  | POST   | Enter valid body{"name": "riprip", "job": "QA Engineer"} and get response 200                                 |
| 2  |        | Enter valid body{"name": "riprip", "job": "QA Engineer", "id": "69"} and get response 400                     |
| 3  |        | Enter Invalid (numeric) body{"name": 1234567, "job": 32123123} and get response 400                           |
| 4  |        | Enter Invalid request body{"try": "hello bug"} and get response 400                                           |
| 5  |        | Enter blank body request and get response 400                                                                 |
| 6  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"},add params(string("/abc/def")) and get response 401  |
+----+--------+---------------------------------------------------------------------------------------------------------------+
| 1  | UPDATE | Enter valid body{"name": "riprip", "job": "QA Engineer"}, valid param(int(2)) and get response 200            |
| 2  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(int(0)) and get response 401          |
| 3  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, blank param and get response 401                    |
| 4  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(int(-5)) and get response 401         |
| 5  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(string("try")) and get response 401   |
| 6  |        | Enter blank body request and get response 400                                                                 |
+----+--------+---------------------------------------------------------------------------------------------------------------+
*/

import {check, group} from 'k6';
import http from 'k6/http';


const BASE_URL = 'https://reqres.in/api/users';
const params = { headers: { 'Content-Type': 'application/json' } };

// export const options = {
//     thresholds: {
//         http_req_duration: ['p(95)<2000'], 
//         http_req_failed: ['rate<0.01'], 
//         checks: ['rate>0.99'],
//     },
// };

export default function(){
    group('Scenario-1-Post', () => {
        let data = {name: 'riprip', job: 'QA Engineer'};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;


        check(res, {
            'response status is 200': (r) => r.status === 201,
            'response body contains name': (r) => r.json().name === 'riprip',
            'reesponse body contains job': (r) => r.json().job === 'QA Engineer',
            'response body contains createdAt': (r) => r.json().createdAt === day

        })
    });

    group('Scenario-2-Post', () => {
        let data = {name: 'riprip', job: 'QA Engineer', id: '69'};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;

        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains name': (r) => r.json().name === 'riprip',
            'response body contains job': (r) => r.json().job === 'QA Engineer',
            'response body contains id': (r) => r.json().id === '69',
            'response body contains createdAt': (r) => r.json().createdAt === day

        })
    });

    group('Scenario-3-Post', () => {
        let data = {name: 1234567, job: 32123123};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;
        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains name': (r) => r.json().name === 1234567,
            'response body contains job': (r) => r.json().job === 32123123,
            'response body contains createdAt': (r) => r.json().createdAt === day

        })
    });

    group('Scenario-4-Post', () => {
        let data = {try: 'hello bug'};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;
        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains try': (r) => r.json().try === 'hello bug',
            'response body contains createdAt': (r) => r.json().createdAt === day

        })
    });
    
    group('Scenario-5-Post', () => {
        let data = {};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;
        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains createdAt': (r) => r.json().createdAt === day
        })
    });

    group('Scenario-6-Post', () => {
        let data = {"name": "riprip", "job": "QA Engineer"}
        let extend_params = "/abc/def";
        let res = http.post(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = res.json().createdAt;

        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains name': (r) => r.json().name === 'riprip',
            'response body contains job': (r) => r.json().job === 'QA Engineer',
            'response body contains createdAt': (r) => r.json().createdAt === day
        })
    });

    group('Scenario-1-Put', function () {
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

    group('Scenario-2-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/0";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;


        check(response, {
            'response status is 401': (r) => r.status === 401,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains updatedAt': (r) => r.json().updatedAt === day
        })
    });

    group('Scenario-3-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;
        
        check(response, {
            'response status is 401': (r) => r.status === 401,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains updatedAt': (r) => r.json().updatedAt === day
        })
    });

    group('scenario-4-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/-5";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;


        check(response, {
            'response status is 401': (r) => r.status === 401,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains updatedAt': (r) => r.json().updatedAt === day

        })
    });

    group('scenario-5-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/try";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;


        check(response, {
            'response status is 401': (r) => r.status === 401,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains updatedAt': (r) => r.json().updatedAt === day

        })
    });

    group('scenario-6-Put', function () {
        let data = {};
        let extend_params = "/";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;
        check(response, {
            'response status is 400': (r) => r.status === 401,
            'response body contains updatedAt': (r) => r.json().updatedAt === day
        })
    });
}