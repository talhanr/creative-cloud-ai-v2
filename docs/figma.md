# Figma map
File key: `KcR62tLQhRi9MLtOy1hOYT` · Page: `569:1912` ("Web Design")
Link: https://www.figma.com/design/KcR62tLQhRi9MLtOy1hOYT/Royal-Creative-Web-Desing?node-id=569-1912

How to read: `get_design_context` (layout/code reference) + `get_screenshot` (visual check).
The file is big — always pass a nodeId, never read the whole page. If an ID fails, find the
frame by name with `get_metadata` on page `569:1912`.

## Read first
- Handoff / spec board: `59015:22306` (rules, copy, motion, validation)

## Phase 1 — Landing
- CURRENT landing page "Home new": `58698:3757` (1920 wide). `3277:227` is an OLD copy — ignore it.
- Default homepage hero (desktop) = the hero section inside `58698:3757`. There is no separate
  1440 default-hero frame.
- Focused typed input (desktop) = follow mobile frame `59016:23839` for behaviour, with the
  desktop hero styling from `58698:3757`.

## Phase 1 — AI flow (Desktop | Mobile)
| State | Desktop | Mobile |
|---|---|---|
| Homepage / default hero | hero inside 58698:3757 | none — adapt from desktop hero |
| Homepage / focused typed input | none — follow mobile + desktop hero | 59016:23839 |
| Homepage / returning visitor | 59015:19397 | 59016:23882 |
| Getting started / missing name | 59015:19427 | 59016:23913 |
| Getting started / missing services | 59015:19470 | 59016:23955 |
| Getting started / missing location | 59015:19510 | 59016:23994 |
| Getting started / unclear input | 59015:19550 | 59016:24033 |
| Getting started / no name yet selected | 59015:19590 | 59016:24072 |
| Q1 / services | 59015:19641 | 59016:24122 |
| Q2 / customers | 59015:19690 | 59016:24170 |
| Q3 / differentiator | 59015:19732 | 59016:24211 |
| Q4 / trust optional | 59015:19774 | 59016:24252 |
| Q5 / main action | 59015:19819 | 59016:24295 |
| Q6 / feeling | 59015:19877 | 59016:24352 |
| Q7 / branding chooser | 59015:19919 | 59016:24393 |
| Q7 / logo upload and palette confirmation | 59015:19971 | 59016:24444 |
| Q7 / colours without logo | 59015:20027 | 59016:24500 |
| Q7 / colour picker open | 59015:20081 | 59016:24554 |
| Q7 / nothing yet | 59015:20139 | 59016:24612 |
| Contact / default inline form | 59015:20183 | 59015:20254 |
| Contact / validation errors | 59015:20325 | 59015:20400 |
| Chat / AI typing | 59015:20475 | 59016:24657 |
| Loading / building browser | 59015:20517 | 59016:24698 |
| Loading / over 20 seconds | 59015:20567 | 59016:24748 |
| Loading / generation failure | 59015:20617 | 59016:24798 |
| Loading / reduced motion | 59015:20653 | 59016:24833 |
| Preview / complete homepage reveal | 59015:20684 | 59015:20842 |
| Get this built / today confirmation | 59015:20995 | 59016:24865 |
| Get this built / after 5pm confirmation | 59015:21033 | 59016:24904 |
| Get this built / weekend confirmation | 59015:21071 | 59016:24943 |
| Book a call / calendar and call type | 59015:21109 | 59016:24982 |
| Booking / phone confirmation | 59015:21282 | 59016:25154 |
| Booking / video confirmation | 59015:21322 | 59016:25195 |
| Welcome back / original preview | 59015:21362 | 59016:25236 |

## Generated-site templates (Desktop | Mobile)
| Template | Desktop | Mobile | Phase |
|---|---|---|---|
| modern | 59015:21625 | 59015:21741 | 1 |
| cosy | 59015:21398 | 59015:21514 | 2 |
| bold | 59015:21852 | 59015:21968 | 2 |
| premium | 59015:22079 | 59015:22195 | 2 |

## Phase 4 — Other pages (CONFIRM with Bilal which versions are current before building)
| Page | Node(s) |
|---|---|
| Services overview | 59286:930 |
| Web Design service | 58820:4592 |
| Marketing | 58830:7994 |
| SEO service | 59095:962 |
| PPC service | 59096:975 |
| Branding service | 59096:1548 |
| Social Media Management | Desktop 59166:1024 · Mobile 59169:1034 |
| Blog list | 58834:1378 |
| Blog article | Desktop 59169:1086 · Mobile 59169:1110 |
| Contact | 58834:1625 (also older 58712:1319) |
| About | 58712:1015 |
| Free Website Concept campaign | Desktop 59292:1026 · Mobile 59292:1102 · Parallax 59313:1224 / 59313:1463 |
| Campaign parts — marquee | Desktop 59303:1138 · Mobile 59303:1303 |
| Campaign parts — enquiry | Desktop 59306:1160 · Mobile 59306:1236 |
| Campaign parts — project backdrop | Desktop 59306:1192 · Mobile 59306:1268 |
| Campaign parts — parallax drift | Desktop 59313:1394 · Mobile 59313:1633 |
| Campaign parts — Google review slider | Desktop 59323:1314 · Mobile 59323:1355 · Parallax 59323:1396 / 59323:1437 |
| Older pages (likely outdated) | services-page 58712:1157 |

## Components on the page
- Recent project / website card (component): `59275:990`
- Dropdown (loose instance, 343×77): `58820:5349`

Last checked against live Figma: 2026-11-17 (109 top-level nodes, all IDs above valid).
