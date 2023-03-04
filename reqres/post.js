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
| 7  |        | Do performance testing {VU: 1000, Iteration: 3500, response tolerance: 2s}, while entering valid random body. |
+----+--------+---------------------------------------------------------------------------------------------------------------+
*/

import {check, group} from 'k6';
import http from 'k6/http';


const BASE_URL = 'https://reqres.in/api/users';
const params = { headers: { 'Content-Type': 'application/json' } };

export default function(){
    group('Scenario 1', () => {
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

    group('Scenario 2', () => {
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

    group('Scenario 3', () => {
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

    group('Scenario 4', () => {
        let data = {try: 'hello bug'};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;
        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains try': (r) => r.json().try === 'hello bug',
            'response body contains createdAt': (r) => r.json().createdAt === day

        })
    });
    
    group('Scenario 5', () => {
        let data = {};
        let res = http.post(BASE_URL, JSON.stringify(data), params);
        let day = res.json().createdAt;
        check(res, {
            'response status is 401': (r) => r.status === 401,
            'response body contains createdAt': (r) => r.json().createdAt === day
        })
    });

    group('Scenario 6', () => {
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

    // group('Scenario 7', () => {

    // })
}
