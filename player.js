export class Player {
    constructor(canvasHeight) {
        this.width = 40;
        this.height = 40;
        this.x = 100;
        this.y = canvasHeight - this.height - 50;
        this.vy = 0;
        this.gravity = 0.8;
        this.jumpForce = -14;
        this.groundY = canvasHeight - 50;
        this.onGround = false;
        this.rotation = 0;
    }

    jump() {
        if (this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }
    }

    update() {
        this.vy += this.gravity;
        this.y += this.vy;

        // Ground Collision
        if (this.y + this.height > this.groundY) {
            this.y = this.groundY - this.height;
            this.vy = 0;
            this.onGround = true;
            this.rotation = Math.round(this.rotation / 90) * 90;
        } else {
            this.onGround = false;
            this.rotation += 5; // Spin effect
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        
        // Neon Cube Style
        ctx.fillStyle = "#00ffcc";
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
        
        ctx.restore();
    }
}
