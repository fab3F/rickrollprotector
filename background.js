const rickrolls = [
  "dQw4w9WgXcQ",
  "oHg5SJYRHA0",
  "cvh0nX08nRw",
  "V-_O7nl0Ii0",
  "2ocykBzWDiM",
  "j5a0jTc9S10",
  "HPk-VhRjNI8",
  "LLFhKaqnWwk",
  "xvFZjo5PgG0",
  "doEqUhFiQS4",
  "6_b7RDuLwcI",
  "G8iEMVr7GFg",
  "AyOqGRjVtls",
  "6mhmcwmgWbA",
  "SpZ2FsEfwP4",
  "H01BwSD9eyQ",
  "nrsnN23tmUA",
  "8mkofgRW1II",
  "rAx5LIul1N8",
  "sO4wVSA9UPs",
  "rrs0B_LM898",
  "epyRUp0BhrA",
  "uK5WDo_3s7s",
  "wzSVOcgKq04",
  "7B--1KArxow",
  "rbsPu1z3ugQ",
  "ptw2FLKXDQE",
  "E50L-JYWm3w",
  "8leAAwMIigI",
  "ByqFY-Boq5Y",
  "E4ihJMQUmUQ",
  "cjBHXvBYw5s",
  "xaazUgEKuVA",
  "TzXXHVhGXTQ",
  "Uj1ykZWtPYI",
  "EE-xtCF3T94",
  "V-_O7nl0Ii0",
  "cqF6M25kqq4",
  "0SoNH07Slj0",
  "xfr64zoBTAQ",
  "j5a0jTc9S10",
  "dPmZqsQNzGA",
  "nHRbZW097Uk",
  "BjDebmqFRuc",
  "Gc2u6AFImn8",
  "8VFzHYtOARw",
  "cSAp9sBzPbc",
  "Dx5i1t0mN78",
  "Oo0twK2ZbLU",
  "lXMskKTw3Bc",
  "7z_1E8VGJOw",
  "VgojnNgmgVs",
  "5wOXc03RwVA",
  "Rtqkxkt7Hyg",
  "Yb6dZ1IFlKc",
  "o-YBDTqX_ZU",
  "zipwduCA9iU",
  "RL0rynUZt3Y",
  "eBGIQ7ZuuiU",
  "mCdA4bJAGGk",
  "H8ZH_mkfPUY",
  "iik25wqIuFo",
  "mTXzFkYX7-g",
  "GtL1huin9EE",
  "p7YXXieghto",
  "QdezFxHfatw",
  "K_YivhIREM4",
  "GHMjD0Lp5DY",
  "34Ig3X59_qA",
  "3BFTio5296w",
  "DLzxrzFCyOs",
  "EpX1_YJPGAY",
  "ZXpThNX9IRc",
  "-DdkOB0htO0",
  "hvL1339luv0",
  "tgTUtfb0Ok8",
  "AyOqGRjVtls",
  "AVlzryCQg8s",
  "5lUYJpoNt4g",
  "mTXzFkYX7-g",
  "DsC8jQXRbQE",
  "qbnt_vmk4fU",
  "K7XHy8nppf4",
  "N9w1lCZfaWI",
  "SwA2R9OyamE",
  "O91DT1pR1ew",
  "xdcXNHyE6Cg",
  "QMW4AqbuSGg",
  "xm3YgoEiEDc",
  "PMH54eetPSo",
  "di14EZRpMVo",
  "131wf0e6ACk",
  "8G0omjVSh_U",
  "cErgMJSgpv0",
  "xsrVWXm1J64",
  "jzwMjOl8Iyo",
  "YxjY_YTksKM",
  "0AmZvXwuyM4",
  "db3aMa-401A",
  "6MIkXsFHeBk",
  "88iUchyd86M",
  "mW61VTLhNjQ"
];

if(typeof location !== 'undefined' && rickrolls.some(id => location.href.includes(id)) && !location.href.includes("rickrollprotector=bypass")) {
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    location = chrome.runtime.getURL("error-firefox.html")+"?"+location.href;
  }else{
    location = chrome.runtime.getURL("error-chrome.html")+"?"+location.href;
  }
}

