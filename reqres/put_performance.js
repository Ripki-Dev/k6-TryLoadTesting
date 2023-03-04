/*
+----+--------+---------------------------------------------------------------------------------------------------------------+
| No | Module | Test Scenario Description                                                                                     |
+----+--------+---------------------------------------------------------------------------------------------------------------+
| 7  |        | Do performance testing {VU: 1000, Iteration: 3500, response tolerance: 2s}, while entering valid random body. |
+----+--------+---------------------------------------------------------------------------------------------------------------+
*/
import {check} from 'k6';
import http from 'k6/http';

const BASE_URL = 'https://reqres.in/api/users/';
const params = { headers: { 'Content-Type': 'application/json' } };
