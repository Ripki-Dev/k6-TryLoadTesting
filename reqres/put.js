/*
+----+--------+---------------------------------------------------------------------------------------------------------------+
| No | Module | Test Scenario Description                                                                                     |
+----+--------+---------------------------------------------------------------------------------------------------------------+
| 1  | UPDATE | Enter valid body{"name": "riprip", "job": "QA Engineer"}, valid param(int(2)) and get response 200            |
| 2  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(int(0)) and get response 401          |
| 3  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, blank param and get response 401                    |
| 4  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(int(-5)) and get response 401         |
| 5  |        | Enter valid body{"name": "riprip", "job": "QA Engineer"}, invalid param(string("try")) and get response 401   |
| 6  |        | Enter blank body request and get response 400                                                                 |
| 7  |        | Do performance testing {VU: 1000, Iteration: 3500, response tolerance: 2s}, while entering valid random body. |
+----+--------+---------------------------------------------------------------------------------------------------------------+
*/

import {check, group} from 'k6';
import http from 'k6/http';


const BASE_URL = 'https://reqres.in/api/users';
const params = { headers: { 'Content-Type': 'application/json' } };

export default function () {
    group('Scenario-1-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "/2";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;

        
        check(response, {
            'response status is 200': (r) => r.status === 200,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains createdAt': (r) => r.json().updatedAt === day

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
            'response body contains createdAt': (r) => r.json().updatedAt === day
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
            'response body contains createdAt': (r) => r.json().updatedAt === day
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
            'response body contains createdAt': (r) => r.json().updatedAt === day

        })
    });

    group('scenario-5-Put', function () {
        let data = {"name": "riprip", "job": "QA Engineer"};
        let extend_params = "try";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;


        check(response, {
            'response status is 401': (r) => r.status === 401,
            'response body is json': (r) => r.json().name === 'riprip',
            'response body is json': (r) => r.json().job === 'QA Engineer',
            'response body contains createdAt': (r) => r.json().updatedAt === day

        })
    });

    group('scenario-6-Put', function () {
        let data = {};
        let extend_params = "/";
        let response = http.put(BASE_URL+extend_params, JSON.stringify(data), params);
        let day = response.json().updatedAt;
        check(response, {
            'response status is 400': (r) => r.status === 401,
            'response body contains createdAt': (r) => r.json().updatedAt === day
        })
    });
}