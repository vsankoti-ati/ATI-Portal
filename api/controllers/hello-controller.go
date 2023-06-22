package controllers

import "github.com/gin-gonic/gin"


type HelloController struct {
	
}

func (c *HelloController) GetName(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"name": "vishnu",
	})	
} 