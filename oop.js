class Warplane {
    constructor(modelName, maxSpeed, ammo, boostReserve) {
        this.name = modelName;
        this.speed = maxSpeed;
        this.ammo = ammo;
        this.boostReserve = boostReserve;
    }

    shoot() {
        if (this.ammo > 0) {
            this.ammo -= 1;
            console.log(`Тра-та-та! ${this.name} стреляет! Осталось снарядов: ${this.ammo}`);
        } else {
            console.log(`${this.name}: Клик-клик. БК пуст! Пора на филд.`);
        }
    }

    afterburner() {
        if (this.boostReserve === 100) {
            console.log(`Форсаж включен! Скорость ${this.name} увеличена!`)
            this.speed += 300;
            this.boostReserve = 0;
        } else {
            console.log(`${this.name}: Форсаж недоступен, баки пусты!`)
        }
    }
}

class Bomber extends Warplane {

    constructor(modelName, maxSpeed, ammo, boostReserve, bombsCount) {

        super(modelName, maxSpeed, ammo, boostReserve);

        this.bombs = bombsCount;
    }

    shoot() {
        if (this.ammo >= 2) {
            this.ammo -= 2;
            console.log(`БАБАХ! ${this.name} бьёт из тяжелой 30-мм пушки! Остаток: ${this.ammo}`);
        } else {
            console.log(`${this.name}: Клик-клик. Снарядов не хватает!`)
        }
    }

    dropBomb() {
        if (this.bombs > 0) {
            this.bombs -= 1;
            console.log(`ФАБ пошла! 💥 ${this.name} сбросил чугуний. Остаток в люке: ${this.bombs}`);
        } else {
            console.log(`${this.name}: Бомб больше нет, мы теперь просто толстый истребитель!`);
        }
    }
}

class Interceptor extends Warplane {

    constructor(modelName, maxSpeed, ammo, boostReserve) {

        super(modelName, maxSpeed, ammo, boostReserve);
    }

    afterburner() {
        if (this.boostReserve === 100) {
            console.log(`Взлетный режим! Двигатели Д-30Ф6 на максимуме! Скорость ${this.name} увеличилась на 500!`)
            this.speed += 500;
            this.boostReserve = 0;
        } else {
            console.log(`${this.name}: Форсаж недоступен, баки пусты!`)
        }
    }
}


const btnSu33 = document.getElementById('buildSu33Btn');
const btnSu34 = document.getElementById('buildSu34Btn');
const btnMig31 = document.getElementById('buildMig31Btn');
const hangar = document.getElementById('hangar');
const btnAlpha = document.getElementById('alphaStrikeBtn');

const mySquadron = [];

function createPlaneCard(plane) {
    const card = document.createElement('div');
    card.classList.add('plane-card');

    let extraStats = '';
    let extraButtons = '';

    if (plane.bombs !== undefined) {
        extraStats = `<p><strong>Бомбы:</strong> <span class="bomb-val">${plane.bombs}</span> шт.</p>`;
        extraButtons = `<button class="bomb-btn">💣 СБРОС ФАБ</button>`;
    }

    card.innerHTML = `
        <h3>🛩️ ${plane.name}</h3>
        <p><strong>Скорость:</strong> <span class="speed-val">${plane.speed}</span> км/ч</p>
        <p><strong>Боезапас:</strong> <span class="ammo-val">${plane.ammo}</span> шт.</p>
        ${extraStats}
        <button class="shoot-btn">🔥 ОГОНЬ!</button>
        <button class="boost-btn">🚀 ФОРСАЖ</button>
        ${extraButtons} 
    `;

    const shootBtn = card.querySelector('.shoot-btn');
    const ammoDisplay = card.querySelector('.ammo-val');
    const boostBtn = card.querySelector('.boost-btn');
    const speedDisplay = card.querySelector('.speed-val');

    if (plane.ammo <= 0) {
        shootBtn.disabled = true;
        shootBtn.textContent = "БК ПУСТ";
        shootBtn.style.backgroundColor = "#555";
        shootBtn.style.cursor = "not-allowed";
    }

    if (plane.boostReserve <= 0) {
        boostBtn.disabled = true;
        boostBtn.textContent = "БАК ПУСТ";
        boostBtn.style.backgroundColor = "#555";
        boostBtn.style.cursor = "not-allowed";
    }

    shootBtn.addEventListener('click', function() {
        plane.shoot();
        ammoDisplay.textContent = plane.ammo;
        if (plane.ammo <= 0) {
            shootBtn.disabled = true;
            shootBtn.textContent = "БК ПУСТ";
            shootBtn.style.backgroundColor = "#555";
            shootBtn.style.cursor = "not-allowed";
        }
    });

    boostBtn.addEventListener('click', function() {
        plane.afterburner();
        speedDisplay.textContent = plane.speed;

        if (plane.boostReserve === 0) {
            boostBtn.disabled = true;
            boostBtn.textContent = "БАК ПУСТ";
            boostBtn.style.backgroundColor = "#555";
            boostBtn.style.cursor = "not-allowed";
        }

    });


    if (plane.bombs !== undefined) {
        const bombBtn = card.querySelector('.bomb-btn');
        const bombDisplay = card.querySelector('.bomb-val');

        if (plane.bombs <= 0) {
            bombBtn.disabled = true;
            bombBtn.textContent = "ЛЮК ПУСТ";
            bombBtn.style.backgroundColor = "#555";
            bombBtn.style.cursor = "not-allowed";
        }

        bombBtn.addEventListener('click', function() {
            plane.dropBomb();
            bombDisplay.textContent = plane.bombs;
            if (plane.bombs <= 0) {
                bombBtn.disabled = true;
                bombBtn.textContent = "ЛЮК ПУСТ";
                bombBtn.style.backgroundColor = "#555";
                bombBtn.style.cursor = "not-allowed";
            }
        });
    }

    hangar.appendChild(card);
}

btnSu33.addEventListener('click', function() {
    const su33 = new Warplane("Су-33", 2300, 150, 100);
    mySquadron.push(su33);
    createPlaneCard(su33);
});

btnSu34.addEventListener('click', function() {
    const su34 = new Bomber("Су-34", 1900, 180, 100, 6);
    mySquadron.push(su34);
    createPlaneCard(su34);
});

btnMig31.addEventListener('click', function() {
    const mig31 = new Interceptor("МиГ-31", 3000, 260, 100);
    mySquadron.push(mig31);
    createPlaneCard(mig31);
});

btnAlpha.addEventListener('click', function() {
    if (mySquadron.length === 0) {
        alert("Командир, ангар пуст! Постройте хотя бы один самолет.");
        return;
    }

    mySquadron.forEach(function(plane) {
        plane.shoot();
    });

    hangar.innerHTML = '';

    mySquadron.forEach(function(plane) {
        createPlaneCard(plane);
    });
});