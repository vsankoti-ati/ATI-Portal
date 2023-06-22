package controllers

import (
	"context"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"time"
	"os"

	"cloud.google.com/go/storage"
	"github.com/gin-gonic/gin"
)

const (
	projectID  = "gcp-archite" // FILL IN WITH YOURS
	bucketName = "ati-storage" // FILL IN WITH YOURS
)

type ClientUploader struct {
	cl         *storage.Client
	projectID  string
	bucketName string
	uploadPath string
}

var uploader *ClientUploader

func init() {
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "api/controllers/gcp-archite-7e6def68f32e.json") // FILL IN WITH YOUR FILE PATH
	os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")
	client, err := storage.NewClient(context.Background())
	if err != nil {
		log.Fatalf("Failed to create client: %v", err)
	}

	uploader = &ClientUploader{
		cl:         client,
		bucketName: bucketName,
		projectID:  projectID,
		uploadPath: "test-files/",
	}
}

func (c *ClientUploader) UploadDocument(ctx *gin.Context) {
	f, err := ctx.FormFile("file_input")
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	blobFile, err := f.Open()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = uploader.UploadFile(blobFile, f.Filename)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "success",
	})
}

// UploadFile uploads an object
func (c *ClientUploader) UploadFile(file multipart.File, object string) error {
	ctx := context.Background()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := c.cl.Bucket(c.bucketName).Object(c.uploadPath + object).NewWriter(ctx)
	if _, err := io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	return nil
}
