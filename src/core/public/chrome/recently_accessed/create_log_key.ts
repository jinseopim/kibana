/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export async function createLogKey(type: string, optionalIdentifier?: string) {
  const baseKey = `kibana.history.${type}`;

  if (!optionalIdentifier) {
    return baseKey;
  }

  const encoder = new TextEncoder();
  const data = encoder.encode(optionalIdentifier);
  const buffer = await window.crypto.subtle.digest({ name: 'SHA-256' }, data);
  const protectedIdentifier = btoa(String.fromCharCode(...new Uint8Array(buffer)));

  return `${baseKey}-${protectedIdentifier}`;
}
