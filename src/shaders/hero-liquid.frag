#version 300 es
precision highp float;
precision highp int;
uniform vec2 uRes;
uniform float uTime;
out vec4 outColor;

// Kudos Liquid Gradient: seed 3, scale .4, turbulence .4/.4/9,
// wave frequency 2, speed 1, exposure/contrast 1.1, mouse disabled.
// The neutral palette lets us interpolate perceptual lightness directly.
uvec3 hash3(uvec3 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> 16u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
vec3 seeded(float seed) {
  return vec3(hash3(uvec3(floatBitsToUint(seed),
    floatBitsToUint(seed * 1.5 + 7.31),
    floatBitsToUint(seed * 2.7 + 13.37)))) / float(0xffffffffu);
}
float palette(float value) {
  float colors[5] = float[5](5.0, 15.0, 10.0, 26.0, 20.0);
  float segment = clamp(value, 0.0, 1.0) * 4.0;
  int index = min(int(segment), 3);
  float a = pow(colors[index] / 255.0, 2.2 / 3.0);
  float b = pow(colors[index + 1] / 255.0, 2.2 / 3.0);
  float lightness = mix(a, b, segment - float(index));
  lightness *= pow(1.1, 1.0 / 3.0);
  lightness = clamp((lightness - 0.5) * 1.1 + 0.5, 0.0, 1.0);
  return pow(lightness, 3.0 * 0.4545);
}
void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float angle = 3.0 * 2.3999632;
  p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * p;
  vec3 seed = seeded(3.0);
  vec3 second = seeded(103.0);
  vec2 phase = (second.xy - 0.5) * 6.28318530;
  float time = uTime * 0.3;
  float sum = 0.0;
  float weights = 0.0;
  for (int layer = 1; layer < 4; layer++) {
    float i = float(layer);
    vec2 q = p * 0.4;
    float a = phase.x;
    float d = phase.y;
    for (int step = 2; step < 9; step++) {
      float j = float(step);
      q += 0.4 * sin(q.yx / 2.5 * j + time + vec2(a, d) + seed.xy * j) / j;
      a += cos(j + d * 1.2 + q.x * 2.0 - time + second.z);
      d += sin(j * q.y + a + seed.z + time + second.y);
    }
    float value = 0.5 + 0.5 * sin(length(q.yx + vec2(a, d) * 0.2) * 2.0 + i * i + seed.x);
    float weight = smoothstep(0.0, 0.5, i / 4.0) * (1.0 - smoothstep(0.5, 1.0, i / 4.0));
    sum += value * weight;
    weights += weight;
  }
  float color = palette(clamp((sum / weights - 0.3) / 0.4, 0.0, 1.0));
  outColor = vec4(vec3(color), 1.0);
}
